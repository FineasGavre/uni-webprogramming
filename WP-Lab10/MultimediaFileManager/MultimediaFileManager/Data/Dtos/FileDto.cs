using MultimediaFileManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Data.Dtos
{
    public class FileDto
    {
        public FileDto(File file)
        {
            id = file.FileId;
            genre_id = file.Genre.GenreId;
            genre_name = file.Genre.Name;
            title = file.Title;
            format = file.Format;
            file_path = file.FilePath;
        }

        public int id { get; set; }

        public int genre_id { get; set; }

        public String genre_name { get; set; }

        public String title { get; set; }

        public String format { get; set; }

        public String file_path { get; set; }
    }
}
