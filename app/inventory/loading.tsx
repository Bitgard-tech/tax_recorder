import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function InventoryLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-9 w-32 bg-muted rounded" />
                    <div className="h-4 w-48 bg-muted rounded" />
                </div>
                <div className="h-10 w-28 bg-muted rounded" />
            </div>

            {/* Table Skeleton */}
            <Card>
                <CardHeader>
                    <div className="h-5 w-28 bg-muted rounded mb-1" />
                    <div className="h-4 w-40 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><div className="h-4 w-16 bg-muted rounded" /></TableHead>
                                <TableHead><div className="h-4 w-20 bg-muted rounded" /></TableHead>
                                <TableHead className="hidden sm:table-cell"><div className="h-4 w-10 bg-muted rounded" /></TableHead>
                                <TableHead><div className="h-4 w-14 bg-muted rounded" /></TableHead>
                                <TableHead className="hidden lg:table-cell"><div className="h-4 w-16 bg-muted rounded" /></TableHead>
                                <TableHead className="text-right hidden md:table-cell"><div className="h-4 w-16 bg-muted rounded ml-auto" /></TableHead>
                                <TableHead className="text-right hidden lg:table-cell"><div className="h-4 w-16 bg-muted rounded ml-auto" /></TableHead>
                                <TableHead className="text-right hidden md:table-cell"><div className="h-4 w-16 bg-muted rounded ml-auto" /></TableHead>
                                <TableHead className="text-right"><div className="h-4 w-12 bg-muted rounded ml-auto" /></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-muted rounded-lg hidden sm:block" />
                                            <div className="h-4 w-28 bg-muted rounded" />
                                        </div>
                                    </TableCell>
                                    <TableCell><div className="h-4 w-20 bg-muted rounded" /></TableCell>
                                    <TableCell className="hidden sm:table-cell"><div className="h-4 w-10 bg-muted rounded" /></TableCell>
                                    <TableCell><div className="h-6 w-14 bg-muted rounded-full" /></TableCell>
                                    <TableCell className="hidden lg:table-cell"><div className="h-4 w-20 bg-muted rounded" /></TableCell>
                                    <TableCell className="hidden md:table-cell"><div className="h-4 w-16 bg-muted rounded ml-auto" /></TableCell>
                                    <TableCell className="hidden lg:table-cell"><div className="h-4 w-14 bg-muted rounded ml-auto" /></TableCell>
                                    <TableCell className="hidden md:table-cell"><div className="h-4 w-16 bg-muted rounded ml-auto" /></TableCell>
                                    <TableCell><div className="h-8 w-8 bg-muted rounded ml-auto" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
