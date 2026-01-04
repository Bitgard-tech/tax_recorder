import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingsLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <div className="h-9 w-28 bg-muted rounded" />
                <div className="h-4 w-48 bg-muted rounded" />
            </div>

            {/* Form Card Skeleton */}
            <Card className="max-w-2xl">
                <CardHeader>
                    <div className="h-5 w-40 bg-muted rounded mb-1" />
                    <div className="h-4 w-64 bg-muted rounded" />
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Form Fields */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-24 bg-muted rounded" />
                            <div className="h-10 w-full bg-muted rounded" />
                        </div>
                    ))}

                    {/* Submit Button */}
                    <div className="h-10 w-32 bg-muted rounded" />
                </CardContent>
            </Card>
        </div>
    );
}
