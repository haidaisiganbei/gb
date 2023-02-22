#!/usr/bin/env node
const { program } = require('commander')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk');
// 解析不同的指令输入
program
  .option('-p, --path <path>', '指定执行目录')
  .version('0.0.1', '-v, --version', '版本号')

/**
 * 在当前文件夹或指定文件夹创建一个React组件

 */
async function handleCreateComponent(name, p = '.') {
  // 文件夹路径
  const dirPath = path.join(process.cwd(), p, name)
  // 检查目录是否存在
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  // 读取模板文件
  const tsxFileBuffer = fs.readFileSync(path.join(__dirname, '../templates/index.tsx')).toString().replace(/Index/g, name).replace(/container/g, name.toLowerCase())
  const scssFileBuffer = fs.readFileSync(path.join(__dirname, '../templates/index.scss')).toString().replace(/container/g, name.toLowerCase())
  // TODO: 替换组件名
  // 写入目标文件
  const tsxFilePath = path.join(dirPath, 'index.tsx')
  const scssFilePath = path.join(dirPath, 'index.scss')
  fs.writeFileSync(tsxFilePath, tsxFileBuffer)
  fs.writeFileSync(scssFilePath, scssFileBuffer)
  console.log(chalk.green(`${name} 组件创建成功:${dirPath}`));
}
program
  .command('create <names...>')
  .description('创建组件')
  .action((names) => {
    const options = program.opts()
    names.forEach(name => {
      handleCreateComponent(name, options.path)
    });
  })

program.parse()
