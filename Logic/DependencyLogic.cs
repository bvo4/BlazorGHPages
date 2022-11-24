namespace BlazorApp1.Logic
{
    public class DependencyLogic : IDependencyLogic
    {
        public int Value1 { get; private set; }
        public int Value2 { get; private set; }

        public DependencyLogic()
        {
            Value1 = 1;
            Value2 = 2;
        }
    }
}