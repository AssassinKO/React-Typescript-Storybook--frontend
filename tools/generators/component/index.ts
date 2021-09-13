import * as ts from 'typescript';
import {
  Tree,
  formatFiles,
  joinPathFragments,
  getProjects,
  generateFiles,
  names,
  applyChangesToString,
} from '@nrwl/devkit';
import { ComponentSchema } from './schema';
import { addImport } from '@nrwl/react/src/utils/ast-utils';

export default async function (host: Tree, schema: ComponentSchema) {
  createComponentFiles(host, schema);
  addExportsToBarrel(host, schema);

  // format all files which were created / updated in this schematic
  await formatFiles(host);
}

function createComponentFiles(host: Tree, schema: ComponentSchema) {
  // read project from workspace.json / angular.json
  const project = getProjects(host).get(schema.project);

  // generate different name variations for substitutions
  const componentNames = names(schema.name);

  // generate component into libs/my-lib-name/src/lib/my-component-name/MyComponentName.tsx
  const targetPath = joinPathFragments(
    project.sourceRoot,
    'lib',
    schema.directory || '',
    componentNames.fileName
  );

  // generate the files from the templatePath into the targetPath
  generateFiles(host, joinPathFragments(__dirname, './files'), targetPath, {
    ...schema,
    tmpl: '',
    ...componentNames,
  });

  // Loop over all changed files listed by the host
  for (const c of host.listChanges()) {
    let deleteFile = false;

    // When skipStory option is set, delete that file again
    if (schema.skipStory && /.*stories.tsx/.test(c.path)) {
      deleteFile = true;
    }

    if (deleteFile) {
      host.delete(c.path);
    }
  }
}

function addExportsToBarrel(host: Tree, schema: ComponentSchema) {
  const project = getProjects(host).get(schema.project);
  const isApp = project.projectType === 'application';

  // Return when it's an application, or export option is set to false
  if (!schema.export || isApp) {
    return;
  }

  // The path the the index.ts of the lib
  const indexFilePath = joinPathFragments(project.sourceRoot, 'index.ts');

  // Read index.ts, add export line, save index.ts
  const buffer = host.read(indexFilePath);
  if (!!buffer) {
    const indexSource = buffer.toString('utf-8');
    const indexSourceFile = ts.createSourceFile(
      indexFilePath,
      indexSource,
      ts.ScriptTarget.Latest,
      true
    );
    const componentNames = names(schema.name);
    const fileRelativePath = joinPathFragments(
      'lib',
      schema.directory || '',
      componentNames.fileName,
      componentNames.className,
    );

    const changes = applyChangesToString(
      indexSource,
      addImport(indexSourceFile, `export * from './${fileRelativePath}';`)
    );
    host.write(indexFilePath, changes);
  }
}
