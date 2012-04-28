using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class LocationController : Controller
    {
        public JsonResult Get(Boolean activeOnly)
        {
            var data = Location.Get(activeOnly);

            return Json(new
            {
                total = data.Count(),
                data = data,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(List<Location> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = Location.repo)
                {
                    foreach (var item in data)
                    {
                        item.CreateDate = DateTime.Now;
                        item.EditDate = DateTime.Now;
                        db.Save("tblLocations", "LocationKey", item);
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
        public JsonResult Update(IList<Location> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = Location.repo)
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Location>("WHERE LocationKey = @0", item.LocationKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblLocations", "LocationKey", rec);

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

        public JsonResult Delete(IList<Location> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = Location.repo)
                {
                    foreach (var item in data)
                    {
                        item.EditDate = DateTime.Now;
                        item.Active = false;
                        db.Save("tblLocations", "LocationKey", item);
                    }

                    success = true;
                    message = "Location(s) deleted successfully";
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
