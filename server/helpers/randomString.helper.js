import randomString from 'randomstring';

const helpers = {
    createTokenValue: async () => {
      let token = randomString.generate();
      return token
    }
}

export default helpers;