import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ReportsLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-9 w-36 bg-muted rounded" />
                    <div className="h-4 w-64 bg-muted rounded" />
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="h-10 w-64 bg-muted rounded" />

            {/* Selectors Skeleton */}
            <div className="flex gap-4">
                <div className="h-10 w-32 bg-muted rounded" />
                <div className="h-10 w-32 bg-muted rounded" />
                <div className="h-10 w-24 bg-muted rounded" />
            </div>

            {/* Summary Cards Skeleton */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="pb-2">
                            <div className="h-4 w-20 bg-muted rounded" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-24 bg-muted rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Table Skeleton */}
            <Card>
                <CardHeader>
                    <div className="h-5 w-32 bg-muted rounded mb-1" />
                    <div className="h-4 w-48 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-12 bg-muted rounded" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
