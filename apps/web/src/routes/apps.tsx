import { createFileRoute } from "@tanstack/react-router";

import AppsPage from "~/components/apps-page";

export const Route = createFileRoute("/apps")({ component: AppsPage });
