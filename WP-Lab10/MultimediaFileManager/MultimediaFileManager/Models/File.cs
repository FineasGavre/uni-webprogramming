using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Models
{
    public class File
    {
        [Key]
        public int FileId { get; set; }

        [ForeignKey("Genre")]
        public int GenreId { get; set; }

        public String Title { get; set; }

        public String Format { get; set; }

        public String FilePath { get; set; }

        public virtual Genre Genre { get; private set; }
        
    }
}
