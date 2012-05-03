using System.Web.Mvc;
using MissNancy.Models;

namespace MissNancy.Helpers
{
    public class ExtJsFilterModelBinder : DefaultModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var filter = (ExtJsFilter)base.BindModel(controllerContext, bindingContext);

            var property = bindingContext.ValueProvider.GetValue(bindingContext.ModelName + "[property]");
            if (property != null)
            {
                filter.property = property.AttemptedValue;
            }


            var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName + "[value]");
            if (value != null)
            {
                if (filter.value == null)
                {
                    filter.value = 0;
                }
            }

            return filter;
        }
    }
}