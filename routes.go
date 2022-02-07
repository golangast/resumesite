package main

import (
	"github.com/labstack/echo/v4"

	//form "gitlab.com/zendrulat123/zegsite/handler/form"
	. "github.com/golangast/resumesite/handler"
)

//Routes is for routing
func Routes(e *echo.Echo) {
	e.GET("/", Home) //home
	//e.GET("/form", form.Form) //form

}
