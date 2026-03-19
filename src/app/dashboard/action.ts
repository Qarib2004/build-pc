'use server'

import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { categoryIdToDbType, Component } from '@/lib/types' 
import { revalidatePath } from 'next/cache';

export type SaveBuildFromState = {
    status: 'idle' | 'success' | 'error',
    message?: string
}

export async function saveBuildAction(
    _prevState: SaveBuildFromState,
    formData: FormData
): Promise<SaveBuildFromState> {
    const name = String(formData.get('name')?? '').trim();
    const componentIds = String(formData.get('componentIds'))
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)

    const result = await saveBuild(name, componentIds)

    if (!result.success) {
        return {
            status: 'error',
            message: result.error
        }
    }

    return {
        status: 'success',
        message: 'Assembly successfully saved'
    }
}

export async function saveBuild(
    name: string,
    componentIds: string[]
): Promise<{success: true; buildId: string} | { success: false; error: string }> {
    const session = await auth();

    if (!session?.user.id) {
        return { success: false, error: 'You need to log in'}
    }

    const trimmedName = name.trim()

    if (!trimmedName) {
        return { success: false, error: 'Enter the build name'}
    }

    if(componentIds.length === 0) {
        return { success: false, error: 'Add at least one component'}
    }

    const components = await prisma.component.findMany({
        where: { id: { in: componentIds }}
    })

    if (components.length !== componentIds.length) {
         return { success: false, error: 'Some components not found'}
    }

    const totalPrice = components.reduce((s,c) => s + c.price, 0)

    try {
        const build = await prisma.$transaction(
            async (tx) => {
                const newBuild = await tx.build.create({
                    data: {
                        name: trimmedName,
                        totalPrice,
                        userId: session.user.id
                    }
                })

                await tx.buildComponent.createMany({
                    data: componentIds.map(componentId => ({
                        buildId: newBuild.id,
                        componentId
                    }))
                })

                return newBuild
            }
        )

        revalidatePath('/dashboard');
        revalidatePath('/builds');

        return { success: true, buildId: build.id}
    } catch (error) {
         return { success: false, error: 'Failed to save builds'}
    }
}

export async function getComponentsByCategory(categoryId: string): Promise<Component[]> {
    const dbType = categoryIdToDbType[categoryId];
    
    if (!dbType) {
        return []
    }

    const components = await prisma.component.findMany({
        where: { type: dbType },
        orderBy: { price: 'asc'}
    })

    return components.map(c => ({
        id: c.id,
        type: c.type,
        name: c.name,
        price: c.price,
        socket: c.socket
    }))
}