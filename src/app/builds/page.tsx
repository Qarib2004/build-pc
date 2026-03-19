import { auth } from "@/auth";
import { TypographyH3 } from "@/components/UI/typography-h3";
import { getMyBuilds } from "@/lib/builds";
import { redirect } from "next/navigation";
import { BuildCard } from "./components/builds-card";
import { DeleteBuildButton } from "./components/delete-build-button";
import { Share2 } from "lucide-react";
import { Button } from "@/components/UI/button";
import { deleteBuildAction, setBuildPublicAction } from "./action";

export default async function MyBuilds() {
    const session = await auth();

    if (!session?.user.id) {
        redirect('/login')
    }

    const builds = await getMyBuilds(session.user.id)

    return (
        <div className="py-6">
            <TypographyH3>My builds</TypographyH3>
            <br />
            <div className="grid gap-4 lg:grid-cols-3">
                {
                    builds.length > 0 ? (
                        builds.map(b => (
                            <BuildCard
                                key={b.id}
                                build={b}
                                sessionUserId={session?.user?.id}
                            >
                                <DeleteBuildButton buildId={b.id} deleteAction={deleteBuildAction}/>
                                <form action={setBuildPublicAction} className="contents">
                                    <input type="hidden" name="buildId" value={b.id}/>
                                    <input type="hidden" name="isPublic" value={b.isPublic ? "false" : "true"} />
                                    <Button
                                        type="submit"
                                        variant={`${b.isPublic ? 'default' : 'ghost'}`}
                                    >
                                        <Share2 className={`
                                            h-4 w-4 mr-1 ${b.isPublic ? 'fill-background' : ""}    
                                        `}/>
                                    </Button>
                                </form>
                            </BuildCard>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No saved builds</p>
                    )
                }
            </div>
        </div>
    )
}