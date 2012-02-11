using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
           // ViewBag.Message = "Welcome to the Miss Nancy VBS Application";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
