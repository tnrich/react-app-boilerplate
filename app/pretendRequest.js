function pretendRequest(email, pass, cb) {

  setTimeout(function () {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      debugger;
      cb({authenticated: false});
    }
  }, 0);
}

module.exports = pretendRequest;