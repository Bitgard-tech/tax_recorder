'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ExpenseCategory } from '@prisma/client';

const expenseSchema = z.object({
    vehicleId: z.string().uuid(),
    description: z.string().min(1, "Description is required"),
    amount: z.coerce.number().positive("Amount must be positive"),
    date: z.coerce.date(),
    category: z.nativeEnum(ExpenseCategory),
    isPublic: z.boolean().optional(),
});

export async function addExpense(data: z.infer<typeof expenseSchema>) {
    const result = expenseSchema.safeParse(data);
    if (!result.success) {
        return { success: false, message: result.error.issues[0].message };
    }

    try {
        let isPublic = result.data.isPublic;

        // Default logic: REPAIR is public by default unless specified
        if (isPublic === undefined) {
            isPublic = result.data.category === 'REPAIR';
        }

        await db.expense.create({
            data: {
                vehicleId: result.data.vehicleId,
                description: result.data.description,
                amount: result.data.amount,
                date: result.data.date,
                category: result.data.category,
                isPublic: isPublic,
            },
        });

        revalidatePath(`/cars/${result.data.vehicleId}`);
        return { success: true, message: "Expense added successfully." };
    } catch (error) {
        console.error("Add expense error:", error);
        return { success: false, message: "Failed to add expense." };
    }
}
