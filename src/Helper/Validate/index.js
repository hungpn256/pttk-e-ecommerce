export const email = {
  check: (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  messenger: 'Hãy nhập đúng email',
};

export const isEmpty = {
  check: (str) => {
    if (typeof str === 'undefined' || str.length === 0 || str === null) {
      return true;
    }
    return false;
  },
  messenger: 'Không được bỏ trống',
};
export const min6 = {
  check: (str) => {
    if (str?.length < 6) {
      return true;
    }
    return false;
  },
  messenger: 'Không được ít hơn 6 ký tự',
};
