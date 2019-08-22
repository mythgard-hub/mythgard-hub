import Router from 'next/router'

export default (context, target) => {
  if (context.res) {
    // SSR mode - issue a redirect
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser just replace the url
    Router.replace(target)
  }
}