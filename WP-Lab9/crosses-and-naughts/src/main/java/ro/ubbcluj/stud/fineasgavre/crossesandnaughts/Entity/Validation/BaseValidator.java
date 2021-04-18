package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Validation;

public interface BaseValidator<T> {

    boolean validate(T entity);

}
