export default async function (Page: any) {
  const main = document.querySelector('main') as HTMLElement

  const page = new Page()

  const element = await page.element

  main.innerHTML = ''
  main.append(element)

  return page
}
