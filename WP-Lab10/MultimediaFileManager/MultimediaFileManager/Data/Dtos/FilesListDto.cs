using MultimediaFileManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Data.Dtos
{
    public class FilesListDto
    {
        public List<FileDto> data { get; set; }
    }
}
