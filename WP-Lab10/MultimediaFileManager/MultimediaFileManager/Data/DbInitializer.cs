using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Data
{
    public class DbInitializer
    {
        public static void Initialize(MultimediaFileManagerContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
