import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Authors } from "./payload/collections/Authors";
import { Posts } from "./payload/collections/Posts";
import { CaseStudies } from "./payload/collections/CaseStudies";
import { Industries } from "./payload/collections/Industries";
import { Pages } from "./payload/collections/Pages";
import { Organisations } from "./payload/collections/portal/Organisations";
import { PortalUsers } from "./payload/collections/portal/PortalUsers";
import { Memberships } from "./payload/collections/portal/Memberships";
import { Engagements } from "./payload/collections/portal/Engagements";
import { Findings } from "./payload/collections/portal/Findings";
import { PortalDocuments } from "./payload/collections/portal/Documents";
import { AuditLog } from "./payload/collections/portal/AuditLog";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— Northport Security",
    },
  },
  collections: [
    // Content
    Posts,
    CaseStudies,
    Industries,
    Pages,
    Authors,
    Media,
    // Portal (tenant data — scoped by lib/portal/data.ts)
    Organisations,
    PortalUsers,
    Memberships,
    Engagements,
    Findings,
    PortalDocuments,
    AuditLog,
    // System
    Users,
  ],
  editor: lexicalEditor(),
  plugins: [
    // Durable media storage. Off in local dev (files go to public/media); when
    // BLOB_READ_WRITE_TOKEN is set (Vercel Blob), uploads go there instead so
    // they survive on serverless hosting.
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    // Dev convenience: sync schema without migration files. Use migrations in prod.
    push: true,
  }),
  // sharp's published types drift from Payload's bundled SharpDependency type;
  // the runtime dependency is correct.
  sharp: sharp as unknown as Parameters<typeof buildConfig>[0]["sharp"],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  graphQL: {
    disable: false,
  },
});
