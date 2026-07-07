import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = [
  {
    url: "https://calebixca.com/lovable-uploads/2c5fc284-b55e-425b-a157-47fe49655461.png",
    dest: "public/images/caleb-avatar.png",
  },
  {
    url: "https://calebixca.com/lovable-uploads/2bd44283-7ee6-4211-a26d-348bb6f1ef75.png",
    dest: "public/images/project-persona-x.png",
  },
  {
    url: "https://calebixca.com/lovable-uploads/53eedeb4-668c-4b1d-8953-0b2afe8053be.png",
    dest: "public/images/project-affirm.png",
  },
  {
    url: "https://calebixca.com/lovable-uploads/666f217a-83e4-4274-9a50-1bfd0932f439.png",
    dest: "public/images/project-streetcode.png",
  },
  {
    url: "https://calebixca.com/lovable-uploads/fdc39b98-0d32-493c-89bf-507f3f1afa62.png",
    dest: "public/images/project-remediant.png",
  },
  {
    url: "https://calebixca.com/lovable-uploads/6dab7e2f-e878-4f49-8864-dd2b5493d709.png",
    dest: "public/images/event-design-challenge-lab.png",
  },
  {
    url: "https://calebixca.com/lovable-uploads/6b8e0af1-78cb-438f-9689-4358dbb8f691.png",
    dest: "public/images/event-designer-mixer.png",
  },
];

async function downloadOne({ url, dest }) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`Downloaded ${dest} (${buf.length} bytes)`);
}

async function run() {
  const batchSize = 4;
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    await Promise.all(
      batch.map((a) => downloadOne(a).catch((err) => console.error(err.message)))
    );
  }
}

run();
