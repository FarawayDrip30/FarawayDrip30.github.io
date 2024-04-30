function getFileParameters() {
  /*
  let params = window.location.href.split("#");
  params.shift();
  for(let i = 0; i < params.length; i++){params[i] = params[i].replaceAll("%20", " ");}
  return params;
  */
  let searchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(searchParams.entries())
}