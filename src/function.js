const alertMessage = (msg, type) => {
	return `<p class="alert alert-${type} d-flex justify-content-between">
    ${msg}
    <button class="btn-close" data-bs-dismiss="alert"></button>
</p>`;
};

const isMobile = (cell) => {
	const pattern = /^(01|\+8801|8801)[0-9]{9}$/;
	return pattern.test(cell);
};

// email validation


const isEmail = (mail) =>{
    const pattern = /^[0-9a-z\._]{1,}@[a-z]{3,8}\.[a-z]{3,9}$/;
    return pattern.test(mail)
}

// Data get from local Storage


