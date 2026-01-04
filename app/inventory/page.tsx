/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Car } from "lucide-react";
import { getVehicles } from "@/actions/vehicle-actions";
import { formatCurrency } from "@/utils/format";
import { AddCarDialog } from "@/components/add-car-dialog";
import { InventoryActions } from "@/components/inventory-actions";

export default async function InventoryPage() {
    const result = await getVehicles();
    const vehicles = result.success && result.data ? result.data : [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
                    <p className="text-muted-foreground">Manage your vehicle inventory</p>
                </div>
                <AddCarDialog />
            </div>

            {/* Vehicle Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Vehicles</CardTitle>
                    <CardDescription>{vehicles.length} vehicles in your inventory</CardDescription>
                </CardHeader>
                <CardContent>
                    {vehicles.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Car className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium mb-2">No vehicles yet</h3>
                            <p className="mb-4">Get started by adding your first vehicle to the inventory.</p>
                            <AddCarDialog />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Reg. Number</TableHead>
                                        <TableHead className="hidden sm:table-cell">Year</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="hidden lg:table-cell">Buy Date</TableHead>
                                        <TableHead className="text-right hidden md:table-cell">Purchase</TableHead>
                                        <TableHead className="text-right hidden lg:table-cell">Expenses</TableHead>
                                        <TableHead className="text-right hidden md:table-cell">Total Cost</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vehicles.map((vehicle: any) => {
                                        const totalExpenses = vehicle.expenses?.reduce((sum: number, e: any) => sum + Number(e.amount), 0) || 0;
                                        const totalCost = Number(vehicle.purchasePrice) + totalExpenses;

                                        return (
                                            <TableRow key={vehicle.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary/10 rounded-lg hidden sm:block">
                                                            <Car className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <span>{vehicle.make} {vehicle.model}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-mono text-xs sm:text-sm">{vehicle.regNumber}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{vehicle.year}</TableCell>
                                                <TableCell>
                                                    <Badge variant={vehicle.status === 'AVAILABLE' ? 'default' : 'secondary'} className="text-xs">
                                                        {vehicle.status === 'AVAILABLE' ? 'Avail' : 'Sold'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                                                    {vehicle.purchaseDate ? new Date(vehicle.purchaseDate).toLocaleDateString() : '-'}
                                                </TableCell>
                                                <TableCell className="text-right hidden md:table-cell">{formatCurrency(vehicle.purchasePrice)}</TableCell>
                                                <TableCell className="text-right hidden lg:table-cell">{formatCurrency(totalExpenses)}</TableCell>
                                                <TableCell className="text-right font-medium hidden md:table-cell">{formatCurrency(totalCost)}</TableCell>
                                                <TableCell className="text-right">
                                                    <InventoryActions vehicle={vehicle} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
