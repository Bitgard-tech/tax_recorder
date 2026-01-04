
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const vehicles = await db.vehicle.findMany({
            orderBy: { createdAt: 'desc' },
            include: { expenses: true } // Include just in case join causes issues, though findMany shouldn't
        });

        const regCounts: Record<string, number> = {};
        const duplicates: any[] = [];
        const seenIds = new Set();

        vehicles.forEach(v => {
            if (regCounts[v.regNumber]) {
                regCounts[v.regNumber]++;
                duplicates.push({
                    regNumber: v.regNumber,
                    id: v.id,
                    model: `${v.make} ${v.model}`,
                    createdAt: v.createdAt,
                    purchasePrice: v.purchasePrice,
                    status: v.status
                });
            } else {
                regCounts[v.regNumber] = 1;
            }
        });

        return NextResponse.json({
            count: vehicles.length,
            duplicateCount: duplicates.length,
            duplicates: duplicates,
            all: vehicles.map(v => ({ id: v.id, reg: v.regNumber, model: v.model }))
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
