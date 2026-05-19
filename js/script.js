function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const tabs = ['overview','plan1','plan2','plan3','extras','proyeccion'];
  document.querySelectorAll('.nav-tab')[tabs.indexOf(id)].classList.add('active');
}