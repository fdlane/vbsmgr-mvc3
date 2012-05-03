using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class BusesController : Controller
    {
        public JsonResult GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = Bus.GetPaged(page, limit, activeOnly);

            return Json(new
            {
                total = data.TotalItems,
                data = data.Items,
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWorkers(int busKey)
        {
            var workers = BusWorkerDetail.GetWorkers(busKey);

            return Json(new
            {
                total = workers.Count(),
                data = workers,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(List<Bus> data)
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
                        db.Save("tblBuses", "BusKey", item);
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
        public JsonResult Update(IList<Bus> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = Bus.repo)
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Bus>("WHERE BusKey = @0", item.BusKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblBuses", "BusKey", rec);

                        // this is a new item, just insert all the records
                        if (item.BusKey == 0)
                        {
                            foreach (var detailRecord in item.BusWorkerDetails)
                            {
                                //rec should now hava a Key from the database
                                detailRecord.BusKey = rec.BusKey;
                                db.Save("tblBusWorkerDetails", "BusWorkerKey", detailRecord);
                            }
                        }
                        else // this is an existing item, handle modifications done be the user
                        {
                            if (item.BusWorkerDetails != null)
                            {
                                foreach (var detailRecord in item.BusWorkerDetails)
                                {
                                    detailRecord.BusKey = rec.BusKey;
                                    db.Save("tblBusWorkerDetails", "BusWorkerKey", detailRecord);
                                }
                            }
                        }

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

        public JsonResult Delete(IList<Bus> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = Bus.repo)
                {
                    foreach (var item in data)
                    {
                        item.EditDate = DateTime.Now;
                        item.Active = false;
                        db.Save("tblBuses", "BusKey", item);

                        db.Delete<BusWorkerDetail>("WHERE BusKey = @0", item.BusKey);
                    }

                    success = true;
                    message = "Bus(s) deleted successfully";
                }
            }

            return Json(new
            {
                success,
                message
            });
        }

        public JsonResult DeleteBusWorker(IList<BusWorkerDetail> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = Bus.repo)
                {
                    foreach (var item in data)
                    {
                        db.Delete<BusWorkerDetail>("WHERE BusWorkerKey = @0", item.BusWorkerKey);
                    }

                    success = true;
                    message = "Bus Worker(s) deleted successfully";
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
