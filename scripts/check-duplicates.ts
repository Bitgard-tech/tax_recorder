
import dotenv from 'dotenv';
dotenv.config();
import db from '../lib/db';

async function main() {
    console.log("Fetching all vehicles...");
    const vehicles = await db.vehicle.findMany({
        orderBy: { createdAt: 'desc' }
    });

    console.log(`Total vehicles found: ${vehicles.length}`);

    const regCounts: Record<string, number> = {};
    const duplicates: any[] = [];

    vehicles.forEach(v => {
        if (regCounts[v.regNumber]) {
            regCounts[v.regNumber]++;
            duplicates.push(v);
        } else {
            regCounts[v.regNumber] = 1;
        }
    });

    if (duplicates.length > 0) {
        console.log("\n⚠️ DUPLICATES FOUND:");
        duplicates.forEach(d => {
            console.log(`- Reg: ${d.regNumber} | Model: ${d.model} | ID: ${d.id} | Created: ${d.createdAt}`);
        });
    } else {
        console.log("\n✅ No duplicates found based on Reg Number.");
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await db.$disconnect());
