using MultimediaFileManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Data.Dtos
{
    public class GenreDto
    {
        public GenreDto(Genre genre)
        {
            id = genre.GenreId;
            name = genre.Name;
        }

        public int id { get; set; }

        public String name { get; set; }
    }
}
