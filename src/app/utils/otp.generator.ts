const createOTP = (otp_length: number = 6) => {
    // to make sure otp is 6 digit bcz multiplier adds 1 digit more
    const adjustOtpLength: number = otp_length - 1;
    const multiplier = 10 ** adjustOtpLength;

    const otp = Math.floor(
        multiplier + Math.random() * multiplier * 9
    ).toString();

    return otp;
};

export default createOTP;
