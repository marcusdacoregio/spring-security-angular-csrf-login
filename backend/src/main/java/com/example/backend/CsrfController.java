package com.example.backend;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/csrf")
public class CsrfController {

	@GetMapping
	public void getCsrfToken(CsrfToken csrfToken) {
		// https://github.com/spring-projects/spring-security/issues/12094#issuecomment-1294150717
		csrfToken.getToken();
	}

}
