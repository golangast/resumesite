package main

import (
	"github.com/labstack/echo/v4"
)

//Routes is for routing
func Routes(e *echo.Echo) {
	e.GET("/", Home) //home
	//e.GET("/form", form.Form) //form

}
