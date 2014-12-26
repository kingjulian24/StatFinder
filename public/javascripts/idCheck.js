function idCheck (id,store) {
	
	if (id.length === 8 && store === 'wm' ) {
		return true;
	}
	if (id.length === 9 && store === 'hn') {
		return true;
	}
	if (id.length === 6  && store === 'wf') {
		return true;
	}

	return false;
	
}

module.exports = idCheck;