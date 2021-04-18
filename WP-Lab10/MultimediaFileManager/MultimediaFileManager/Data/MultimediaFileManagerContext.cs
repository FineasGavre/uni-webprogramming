using Microsoft.EntityFrameworkCore;
using MultimediaFileManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultimediaFileManager.Data
{
    public class MultimediaFileManagerContext : DbContext
    {
        public MultimediaFileManagerContext(DbContextOptions<MultimediaFileManagerContext> options) : base(options)
        {
        }
        
        public DbSet<File> Files { get; set; }
        public DbSet<Genre> Genres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<File>().ToTable("Files");
            modelBuilder.Entity<Genre>().ToTable("Genres");
        }
    }
}
