import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { renderToStaticMarkup } from "react-dom/server";

import {
  getAllProjects,
  getAllWritings,
  getProjectBySlug,
  getProjectSlugs,
  getWritingBySlug,
  getWritingSlugs,
} from "./content";

export const loadProjects = createServerFn({ method: "GET" }).handler(
  async () =>
    Promise.all(
      (await getAllProjects()).map(async ({ content, ...project }) => ({
        ...project,
        html: renderToStaticMarkup(content),
      }))
    )
);

export const loadWritings = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookies = getRequestHeader("cookie") ?? "";
    const includeDraft = cookies
      .split(";")
      .some((cookie) => cookie.trim() === "draft=1");
    return Promise.all(
      (await getAllWritings({ includeDraft })).map(
        async ({ content, ...writing }) => ({
          ...writing,
          html: renderToStaticMarkup(content),
        })
      )
    );
  }
);

export const loadProjectSlugs = createServerFn({ method: "GET" }).handler(() =>
  getProjectSlugs()
);

export const loadWritingSlugs = createServerFn({ method: "GET" }).handler(() =>
  getWritingSlugs()
);

export const loadProject = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data: { slug } }) => {
    const { content, ...project } = await getProjectBySlug(slug);
    return { ...project, html: renderToStaticMarkup(content) };
  });

export const loadWriting = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data: { slug } }) => {
    const { content, ...writing } = await getWritingBySlug(slug);
    return { ...writing, html: renderToStaticMarkup(content) };
  });
