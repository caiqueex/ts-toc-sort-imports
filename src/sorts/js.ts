export default (text: string[]):any => {
    let imports = text
      .filter(
        (line: any) =>
          line.startsWith('import') && (line.endsWith('"') || line.endsWith(';'))
      )
      .sort((a:any, b:any) => b.length - a.length);
  
    let code = text.filter(
      (line:any) =>
        !line.startsWith('import') ||
        (line.startsWith('import') &&
          (!line.endsWith('"') && !line.endsWith(';')))
    );
  
    return `${imports.join('\n')}\n${code.join('\n')}`;
  };