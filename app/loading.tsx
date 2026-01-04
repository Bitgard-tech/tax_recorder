import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-6 sm:space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-40 bg-muted rounded" />
                    <div className="h-4 w-56 bg-muted rounded" />
                </div>
                <div className="h-9 w-32 bg-muted rounded" />
            </div>

            {/* KPI Cards Skeleton */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 w-24 bg-muted rounded" />
                            <div className="h-4 w-4 bg-muted rounded" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-20 bg-muted rounded mb-2" />
                            <div className="h-3 w-28 bg-muted rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-muted rounded-lg" />
                ))}
            </div>

            {/* Recent Vehicles Skeleton */}
            <Card>
                <CardHeader>
                    <div className="h-5 w-36 bg-muted rounded mb-1" />
                    <div className="h-4 w-28 bg-muted rounded" />
                </CardHeader>
                <CardContent className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-muted rounded-lg" />
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-muted rounded" />
                                    <div className="h-3 w-24 bg-muted rounded" />
                                </div>
                            </div>
                            <div className="h-6 w-16 bg-muted rounded-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
