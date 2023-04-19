export default function (rootQuery: string, block: any) {
  const main = document.querySelector(rootQuery) as HTMLElement

  const element = block.element

  main.innerHTML = ''
  main.append(element)

  block.dispatchComponentDidMount()
}
