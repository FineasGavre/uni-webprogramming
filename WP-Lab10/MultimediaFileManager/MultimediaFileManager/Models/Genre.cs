using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Models
{
    public class Genre
    {
        [Key]
        public int GenreId { get; set; }

        public String Name { get; set; }
    }
}
