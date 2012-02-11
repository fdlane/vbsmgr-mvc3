using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class NeighborhoodController : Controller
    {
        public JsonResult Get(int? start, int? limit)
        {
            var db = new PetaPoco.Database("MissNancy");
            var data = db.Query<Neighborhood>("WHERE Active <>0");

            return Json(new
            {
                total = data.Count(),
                data = data,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(List<Neighborhood> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        item.CreateDate = DateTime.Now;
                        item.EditDate = DateTime.Now;
                        db.Save("tblNeighborhooda", "NeighborhoodKey", item);
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
        public JsonResult Update(IList<Neighborhood> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = new PetaPoco.Database("MissNancy"))
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Neighborhood>("WHERE NeighborhoodKey = @0", item.NeighborhoodKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblNeighborhooda", "NeighborhoodKey", rec);

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

        public JsonResult Delete(IList<Neighborhood> data)
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
                        db.Save("tblNeighborhooda", "NeighborhoodKey", item);
                    }

                    success = true;
                    message = "Neighborhood(s) deleted successfully";
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
