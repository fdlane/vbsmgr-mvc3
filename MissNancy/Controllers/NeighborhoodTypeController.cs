﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class NeighborhoodTypeController : Controller
    {
        public JsonResult GetPaged(String key, String query, int page, int limit, Boolean activeOnly)
        {
            if (null != key)
            {
                var data = NeighborhoodType.Single(key);
                return Json(new
                {
                    data = data,
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data =  NeighborhoodType.GetPaged(query, page, limit, activeOnly);

                return Json(new
                {
                    total = data.TotalItems,
                    data = data.Items,
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Create(List<NeighborhoodType> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = NeighborhoodType.repo)
                {
                    foreach (var item in data)
                    {
                        item.CreateDate = DateTime.Now;
                        item.EditDate = DateTime.Now;
                        db.Save("tblNeighborhoodTypes", "NeighborhoodTypeKey", item);
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
        public JsonResult Update(IList<NeighborhoodType> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = NeighborhoodType.repo)
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<NeighborhoodType>("WHERE NeighborhoodTypeKey = @0", item.NeighborhoodTypeKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblNeighborhoodTypes", "NeighborhoodTypeKey", rec);

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

        public JsonResult Delete(IList<NeighborhoodType> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = NeighborhoodType.repo)
                {
                    foreach (var item in data)
                    {
                        item.EditDate = DateTime.Now;
                        item.Active = false;
                        db.Save("tblNeighborhoodTypes", "NeighborhoodTypeKey", item);
                    }

                    success = true;
                    message = "NeighborhoodType(s) deleted successfully";
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
