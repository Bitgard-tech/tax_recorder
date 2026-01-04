"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Wrench, User, Car, FileText, MoreHorizontal } from "lucide-react";
import { addExpense } from "@/actions/expense-actions";

type ExpenseCategory = "REPAIR" | "BROKER_FEE" | "TRAVEL" | "DOCUMENTATION" | "OTHER";

interface CategoryConfig {
    value: ExpenseCategory;
    label: string;
    icon: React.ElementType;
    placeholder: string;
    defaultPublic: boolean;
    variant: "default" | "secondary" | "outline";
}

const categoryConfigs: CategoryConfig[] = [
    {
        value: "REPAIR",
        label: "Repair",
        icon: Wrench,
        placeholder: "Engine overhaul, brake pads...",
        defaultPublic: true,
        variant: "default"
    },
    {
        value: "BROKER_FEE",
        label: "Broker Fee",
        icon: User,
        placeholder: "Commission, finder's fee...",
        defaultPublic: false,
        variant: "secondary"
    },
    {
        value: "TRAVEL",
        label: "Travel",
        icon: Car,
        placeholder: "Fuel, transport...",
        defaultPublic: false,
        variant: "secondary"
    },
    {
        value: "DOCUMENTATION",
        label: "Documentation",
        icon: FileText,
        placeholder: "Registration, insurance...",
        defaultPublic: false,
        variant: "secondary"
    },
    {
        value: "OTHER",
        label: "Other",
        icon: MoreHorizontal,
        placeholder: "Miscellaneous expense...",
        defaultPublic: false,
        variant: "outline"
    },
];

function ExpenseButton({
    vehicleId,
    config
}: {
    vehicleId: string;
    config: CategoryConfig;
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const Icon = config.icon;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            vehicleId,
            description: formData.get("description") as string,
            amount: parseFloat(formData.get("amount") as string),
            date: new Date(formData.get("date") as string),
            category: config.value,
            isPublic: formData.get("isPublic") === "on",
        };

        const result = await addExpense(data);

        if (result.success) {
            setOpen(false);
            router.refresh();
        } else {
            setError(result.message);
        }

        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant={config.variant} className="gap-1.5 px-2 sm:px-3">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{config.label}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            Add {config.label}
                        </DialogTitle>
                        <DialogDescription>
                            Record a {config.label.toLowerCase()} expense for this vehicle.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder={config.placeholder}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (LKR)</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="50000"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" name="date" type="date" required />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isPublic"
                                name="isPublic"
                                className="h-4 w-4 rounded border-gray-300"
                                defaultChecked={config.defaultPublic}
                            />
                            <Label htmlFor="isPublic" className="text-sm font-normal">
                                Show on public certificate
                            </Label>
                        </div>
                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add {config.label}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function ExpenseButtons({ vehicleId }: { vehicleId: string }) {
    return (
        <div className="grid grid-cols-5 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
            {categoryConfigs.map((config) => (
                <ExpenseButton key={config.value} vehicleId={vehicleId} config={config} />
            ))}
        </div>
    );
}

// Keep the old component for backwards compatibility
export function AddExpenseDialog({ vehicleId }: { vehicleId: string }) {
    return <ExpenseButtons vehicleId={vehicleId} />;
}
