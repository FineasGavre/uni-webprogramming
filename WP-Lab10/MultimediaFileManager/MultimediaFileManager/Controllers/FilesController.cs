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
    public class FilesController : ControllerBase
    {
        private MultimediaFileManagerContext _context;

        public FilesController(MultimediaFileManagerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public FilesListDto GetAllFiles()
        {
            var filesList = new List<FileDto>();

            foreach (var file in _context.Files.ToList())
            {
                filesList.Add(new FileDto(file));
            }

            var filesDto = new FilesListDto
            {
                data = filesList
            };

            return filesDto;
        }

        [HttpGet]
        [Route("id")]
        public FilesListDto GetFileById(int id)
        {
            var file = _context.Files.Find(id);
            if (file == null)
            {
                return new FilesListDto
                {
                    data = new List<FileDto>()
                };
            }

            var filesList = new List<FileDto>
            {
                new FileDto(file)
            };

            var filesDto = new FilesListDto
            {
                data = filesList
            };

            return filesDto;
        }

        [HttpPost]
        public ActionResult CreateNewFile(int genre_id, String title, String format, String file_path)
        {
            var genre = _context.Genres.Find(genre_id);
            if (genre == null)
            {
                return NotFound("Genre was not found.");
            }

            var file = new File
            {
                GenreId = genre_id,
                Title = title,
                Format = format,
                FilePath = file_path
            };

            try
            {
                _context.Files.Add(file);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpDelete]
        public ActionResult DeleteFile(int id)
        {
            try
            {
                _context.Files.Remove(_context.Files.Find(id));
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
