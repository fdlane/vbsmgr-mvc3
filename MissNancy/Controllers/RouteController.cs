using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class RouteController : Controller
    {
        public JsonResult GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = Route.GetPaged(page, limit, activeOnly);

            return Json(new
            {
                total = data.TotalItems,
                data = data.Items,
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult Create(List<Route> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = Route.repo)
                {
                    foreach (var item in data)
                    {
                        item.CreateDate = DateTime.Now;
                        item.EditDate = DateTime.Now;
                        db.Save("tblRoutes", "RouteKey", item);
                    }

                    success = true;
                    message = "Jesus Saves and so did this method";
                }
            }

            return Json(new
            {
                data,
                success,
                message
            });

        }

        [HttpPost]
        public JsonResult Update(IList<Route> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = Route.repo)
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Route>("WHERE RouteKey = @0", item.RouteKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblRoutes", "RouteKey", rec);

                    }

                    success = true;
                    message = "Jesus Saves and so did this method";
                }
            }

            return Json(new
            {
                data,
                success,
                message
            });
        }

        public JsonResult Delete(IList<Route> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        item.EditDate = DateTime.Now;
                        item.Active = false;
                        db.Save("tblRoutes", "RouteKey", item);
                    }

                    success = true;
                    message = "Route(s) deleted successfully";
                }
            }

            return Json(new
            {
                success,
                message
            });
        }
    }
}
