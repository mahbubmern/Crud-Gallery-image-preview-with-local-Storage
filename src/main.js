const form = document.getElementById('form');
const msg = document.querySelector('.msg');
const userList = document.querySelector('.userList');
const h6 = document.querySelector('h6');
const deleteAlert = document.querySelector('.deleteAlert');

const dataLength = JSON.parse(localStorage.getItem('data'));

let gallery = [];
const img = document.createElement('img');
form.onsubmit = (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData);

	let finalData = [];
	if (localStorage.getItem('data')) {
		finalData = JSON.parse(localStorage.getItem('data'));
	}
	data.profile_photo = URL.createObjectURL(data.profile_photo);

	data.gallery_photo = gallery;

	if (!data.name.trim()) {
		msg.innerHTML = alertMessage('All fields are required', 'danger');
	} else if (!isMobile(data.cell)) {
		msg.innerHTML = alertMessage('Cell No Not Valid', 'warning');
	} else if (!isEmail(data.email)) {
		msg.innerHTML = alertMessage('Mail Not Valid', 'info');
	} else {
		msg.innerHTML = alertMessage('Data Stable', 'success');
		finalData.unshift(data);
		localStorage.setItem('data', JSON.stringify(finalData));
		img.remove();
		gallery_container.innerHTML = '';
		getLSData();
		h6.innerHTML = `Total User = ${finalData.length}`;
		setTimeout(() => {
			msg.innerHTML = '';
		}, 2000);
		form.reset();
	}
};

// user image preview

const preview = document.getElementById('preview');
const profile = document.querySelector('.profile');

preview.onchange = (e) => {
	const url = URL.createObjectURL(e.target.files[0]);

	img.setAttribute('src', url);
	profile.appendChild(img);
};

// gallery preview

const gallery_preview = document.getElementById('gallery_preview');
const gallery_container = document.querySelector('.gallery-container');

gallery_preview.onchange = (e) => {
	let files = e.target.files;

	for (let i = 0; i < files.length; i++) {
		// let img = document.createElement('img');
		// img.src = URL.createObjectURL(files[i]);
		// gallery_container.appendChild(img);
		const element = URL.createObjectURL(files[i]);
		gallery.push(element);
	}
	renderGallery();
};

const renderGallery = () => {
	gallery_container.innerHTML = '';

	gallery.map((item, index) => {
		gallery_container.innerHTML += `<div class="my-3" id="${index}">
		<img src="${item}" alt="">
		 <span><i onclick="deletePic('${item}')" class="fa fa-close"></i></span>
		 </div>`;
	});
};

const deletePic = (blop) => {
	let value = blop;
	console.log(value);
	let update = gallery.filter((data) => data != value);

	gallery = [];
	update.map((item, index) => {
		gallery.push(item);
	});
	renderGallery();
};

// data get from local Storage

const getLSData = () => {
	const lsData = JSON.parse(localStorage.getItem('data'));
	let list = '';
	if (lsData) {
		lsData.map((item, index) => {
			list += `	<tr>
			<th>${index + 1}</th>

			<td>${item.name}</td>
			<td>${item.email}</td>
			<td>${item.cell}</td>

			<td>
				<a class="btn btn-sm btn-info viewPerson" viewIndex="${index}"  ><i class="fa fa-eye"></i></a>
				<a class="btn btn-sm btn-warning personEdit " editIndex="${index}" ><i class="fa fa-edit"></i></a>
				<a class="btn btn-sm btn-danger personDelete" deleteIndex="${index}" ><i class="fa fa-trash"></i
				></a>
			</td>
		</tr>`;
		});
		userList.innerHTML = list;
		h6.innerHTML = `Total User = ${dataLength.length}`;
	}
};
getLSData();

userList.onclick = (e) => {
	if (e.target.classList.contains('viewPerson')) {
		updateForm.innerHTML = '';
		let index = e.target.getAttribute('viewIndex');

		const allLSData = JSON.parse(localStorage.getItem('data'));
		let userName = allLSData[index];

		previewProfile.innerHTML = `<div class="card w-50">
	<div class="card-header"> <h5 style="color: #3b5998;">User's Profile Preview</h5></div>
	<div class="card-body">
		<span style="color: red;"><b>Name : </b></span> <span style="color: green;">${userName.name}</span> <br>
		<span style="color: red;"><b>Email :  </b></span> <span style="color: green;">${userName.email}</span> <br>
		<span style="color: red;"><b>Cell : </b></span> <span style="color: green;">${userName.cell}</span>
	</div>
</div>`;
	}

	if (e.target.classList.contains('personEdit')) {
		previewProfile.innerHTML = '';
		let index = e.target.getAttribute('editIndex');
		const allLSData = JSON.parse(localStorage.getItem('data'));
		let userName = allLSData[index];
		updateForm.innerHTML = `
	
	<div class="card w-50">
	<div class="card-header"> <h5>Update User's Details</h5></div>
	<div class="card-body">
	<div class="my-3">
		<label for="">Name</label>
		<input type="text" class="form-control" name="name" value="${userName.name}" />
	</div>
	<input type="text" class="form-control" name="index" hidden value="${index}" />
	<div class="my-3">
		<label for="">Email</label>
		<input type="text" class="form-control" name="email" value="${userName.email}" />
	</div>

	<div class="my-3">
		<label for="">Cell No</label>
		<input type="text" class="form-control" name="cell"  value="${userName.cell}"/>
	</div>
	<div class="my-3">
		<button type="submit" class="btn btn-primary">Update</button>
		
	</div>

	</div>

</div>
`;
		
	}

	if (e.target.classList.contains('personDelete')) {
		updateForm.innerHTML = '';
		previewProfile.innerHTML = '';
		let index = e.target.getAttribute('deleteIndex');
		const allLSData = JSON.parse(localStorage.getItem('data'));
		let dData = allLSData[index].name;
		allLSData.splice(index, 1);

		localStorage.setItem('data', JSON.stringify(allLSData));
		deleteAlert.innerHTML = `<p class="align-right alert alert-danger my-2 d-flex justify-content-between" data-bs-dismiss="alert"> ${dData} Data Deleted Successfull <button class="btn-close"></button></p>`;
		getLSData();
		setTimeout(() => {
			deleteAlert.innerHTML = '';
		}, 2000);

		h6.innerHTML = `Total User = ${allLSData.length}`;
	}
};

// const deleteUser = (item) => {
// 	let index = item;

// };

// view user Profile

// const editProfile = (itemIndex) => {

// };

// catch div element for preview

const previewProfile = document.querySelector('.previewProfile');

// // const viewProfile = (itemIndex) => {

// // };

// user Data edit

const updateForm = document.getElementById('updateForm');

updateForm.onsubmit = (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData);

	const { name, email, cell, index } = data;
	const allLSData = JSON.parse(localStorage.getItem('data'));
	allLSData[index] = { name, email, cell };
	localStorage.setItem('data', JSON.stringify(allLSData));
	getLSData();
	deleteAlert.innerHTML = `<p class="align-right alert alert-success my-2 d-flex justify-content-between" data-bs-dismiss="alert">Update Successfull <button class="btn-close"></button></p>`;
		setTimeout(() => {
			deleteAlert.innerHTML = '';
		}, 2000);
	updateForm.innerHTML = '';
};
