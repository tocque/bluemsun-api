package com.bluemsun.util;

import javax.servlet.http.HttpServletRequest;

public class CodeUtil {
	/**
	 * 检查验证码是否和预期相符
	 * 
	 * @param request
	 * @return
	 */
	public static boolean checkVerifyCode(HttpServletRequest request){
		String verifyCodeExpected = (String) request.getSession()
				.getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
		String verifyCodeActual = HttpServletRequestUtil.getString(request, "verifyCodeActual");
		String newverifyCodeActual=changeChar(verifyCodeActual);
		String newverifyCodeExpected=changeChar(verifyCodeExpected);
		if (verifyCodeActual==null|!newverifyCodeActual.equals(newverifyCodeExpected)){
			return false;
		}
		else{
			return true;
		}

	}
	private static String changeChar(String str){
		StringBuffer sb = new StringBuffer();
		if (str != null) {
			for (int i = 0; i < str.length(); i++) {
				char c = str.charAt(i);
				if (Character.isUpperCase(c)) {
					sb.append(Character.toLowerCase(c));
				}
				else {
					sb.append(c);
				}
			}
		}
		return sb.toString();
	}
}
