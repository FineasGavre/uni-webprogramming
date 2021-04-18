using Microsoft.AspNetCore.Mvc;
using MultimediaFileManager.Data;
using MultimediaFileManager.Data.Dtos;
using MultimediaFileManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GenresController : ControllerBase
    {
        private MultimediaFileManagerContext _context;

        public GenresController(MultimediaFileManagerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public GenresListDto GetAllGenres()
        {
            var genresList = new List<GenreDto>();

            foreach (var genre in _context.Genres.ToList())
            {
                genresList.Add(new GenreDto(genre));
            }

            var genresDto = new GenresListDto
            {
                data = genresList
            };

            return genresDto;
        }

        [HttpPost]
        public ActionResult CreateNewGenre(String name)
        {
            var genre = new Genre
            {
                Name = name
            };

            try
            {
                _context.Genres.Add(genre);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
            return Ok();
        }

        [HttpDelete]
        public ActionResult DeleteGenre(int id)
        {
            try
            {
                _context.Genres.Remove(_context.Genres.Find(id));
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

            return Ok();
        }

    }
}
