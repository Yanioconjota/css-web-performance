
document.addEventListener("DOMContentLoaded", (event) => {
	var hamburger = document.getElementById('hamburger');
	var closeSidebarBtn = document.getElementById('closeSidebarBtn');

	hamburger.addEventListener('click', () => {
		document.getElementById('sidebar').classList.add('is-open');
	});
	closeSidebarBtn.addEventListener('click', () => {
		document.getElementById('sidebar').classList.remove('is-open');
	});

});