define(['router'], function(backRouter) {
  return {
    baseUrl: "../",
    templatePre: "../",
    controllerPre: "../",
    route: [backRouter],
    defaultRedirect: '/home/welcome',
    nodeUrlPre: "../",
    domain: "http://121.52.221.223:8192/merchantservice",

  }
})
